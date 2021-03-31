const express = require('express');
const uuid = require('uuid');

const routes = express.Router();

const users = [];

routes.post('/user', (req, res) => {
    const { name, password, email, birthDay } = req.body;

    user = { 
        id: uuid.v4(),
        name, 
        password, 
        email, 
        birthDay 
    }

    users.push(user);

    res.json(users);
})

routes.get('/user', (req, res) => {
    return res.json(users)
})

routes.get('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find( user => user.id === id);

    if(!user) {
        return res.json({ error: ("User not exists!") })
    }

    return res.status(201).json(user)
})

routes.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, password, email, birthDay } = req.body;
    let user = users.find( user => user.id === id);

    if(!user) {
        return res.json({ error: ("User not exists!") })
    }

    user = {
        name, 
        password,
        email,
        birthDay
    }

    users[id] = user;

    return res.status(200).json(user);
})

routes.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find( user => user.id === id);

    if(!user) {
        return res.json({ error: ("User not exists!") })
    }

    users.splice(user, 1);

    return res.status(204).json();
})

routes.post('/login', (req, res) => {
    const { name, password } = req.body
    const user = users.find( user => user.name === name && user.password === password);

    if(!user) {
        return res.json({ error: ("User or password is wrong!") })
    }

    // user.token = uuid.v4(); // criação de atributo
    // users[user.id] = user; 

    return res.json({...user}); // Quebra cabeça: Adicionar um token ao usuário.
    // quando o usuário loga, ele vai devolver um token.
    // json() = devolve: nome, email, etc e token.
    // end points só funcionem se o token estiver ativo.
    // conceito de cash etc.
    // 
})

module.exports = routes

