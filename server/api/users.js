import { Router } from 'express'
import { UserService } from '../services'

var router = Router()

/* GET users listing. */
router.get('/users', async (req, res, next) => {
  const users = await UserService.getUsers();
  res.json(users);
});

/* GET user by ID. */
router.get('/users/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const users = await UserService.getUsers({id});
  if (users.ids.length > 0) return res.json(users.list[users.ids[0]]);

  res.sendStatus(404);
});

router.post('/users', async (req, res, next) => {
  const id = await UserService.addUser(req.body);
  res.json(id);
});

router.delete('/users/:id', async (req, res, next) => {
  const id = parseInt(req.params.id);
  const result = await UserService.removeUser({id});
  if (result) return res.sendStatus(200);

  return res.sendStatus(500);
});

export default router
