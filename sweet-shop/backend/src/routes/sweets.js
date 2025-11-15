const express = require('express');
const db = require('../db');
const { auth, requireAdmin } = require('../middleware/auth');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// create sweet (admin)
router.post('/', auth, requireAdmin, async (req, res) => {
  const { name, category, price, quantity } = req.body;
  if (!name || !category || price==null || quantity==null) return res.status(400).json({ error: 'Missing fields' });
  try {
    const id = uuidv4();
    await db.query('INSERT INTO sweets(id,name,category,price,quantity) VALUES($1,$2,$3,$4,$5)', [id,name,category,price,quantity]);
    const r = await db.query('SELECT * FROM sweets WHERE id=$1',[id]);
    res.status(201).json(r.rows[0]);
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// list/get
router.get('/', async (req, res) => {
  try {
    const r = await db.query('SELECT * FROM sweets ORDER BY name');
    res.json(r.rows);
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// search
router.get('/search', async (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;
  const parts = [];
  const values = [];
  let idx = 1;
  if (q) { parts.push(`name ILIKE $${idx}`); values.push('%'+q+'%'); idx++; }
  if (category) { parts.push(`category = $${idx}`); values.push(category); idx++; }
  if (minPrice) { parts.push(`price >= $${idx}`); values.push(parseFloat(minPrice)); idx++; }
  if (maxPrice) { parts.push(`price <= $${idx}`); values.push(parseFloat(maxPrice)); idx++; }
  const where = parts.length ? 'WHERE ' + parts.join(' AND ') : '';
  try {
    const r = await db.query(`SELECT * FROM sweets ${where} ORDER BY name`, values);
    res.json(r.rows);
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// update (admin)
router.put('/:id', auth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const fields = ['name','category','price','quantity'];
  const sets = [];
  const values = [];
  let idx=1;
  for(const f of fields){
    if (f in req.body) { sets.push(`${f}=$${idx}`); values.push(req.body[f]); idx++; }
  }
  if (!sets.length) return res.status(400).json({ error: 'Nothing to update' });
  values.push(id);
  try {
    await db.query(`UPDATE sweets SET ${sets.join(', ')} WHERE id=$${idx}`, values);
    const r = await db.query('SELECT * FROM sweets WHERE id=$1',[id]);
    res.json(r.rows[0]);
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// delete (admin)
router.delete('/:id', auth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM sweets WHERE id=$1',[id]);
    res.status(204).end();
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// purchase (reduce quantity)
router.post('/:id/purchase', auth, async (req, res) => {
  const { id } = req.params;
  const qty = parseInt(req.body.qty || 1);
  try {
    const r = await db.query('SELECT quantity, price FROM sweets WHERE id=$1',[id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    const cur = r.rows[0].quantity;
    if (cur < qty) return res.status(400).json({ error: 'Insufficient stock' });
    await db.query('UPDATE sweets SET quantity = quantity - $1 WHERE id=$2',[qty,id]);
    res.json({ ok: true });
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

// restock (admin)
router.post('/:id/restock', auth, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const add = parseInt(req.body.qty || 1);
  try {
    const r = await db.query('SELECT quantity FROM sweets WHERE id=$1',[id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Not found' });
    await db.query('UPDATE sweets SET quantity = quantity + $1 WHERE id=$2',[add,id]);
    const rr = await db.query('SELECT * FROM sweets WHERE id=$1',[id]);
    res.json(rr.rows[0]);
  } catch(err){ console.error(err); res.status(500).json({ error: 'Internal error' }); }
});

module.exports = router;
