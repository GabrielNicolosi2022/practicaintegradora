import { Router } from "express";

const router = Router();

// rutas handlebars
router.get('/abmprod', (req, res) => {
  res.render('prodForm', {
    title: 'ABM de Productos',
  });
})

router.post('/mensages', (req, res) => {
  res.render('newProdData');
})

export default router;