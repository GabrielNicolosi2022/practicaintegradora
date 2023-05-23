import { Router } from "express";

const router = Router();

// rutas handlebars


router.get('/', (req, res) => {
  res.render('prodForm', {
    title: 'ABM de Productos',
  });
})

router.put('/response', (req, res) => {
  res.render('newProdData');
})

export default router;