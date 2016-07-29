module.exports = {
  path: '/random-hop',
  method: 'GET',
  handler(req, reply) {
    if (!req.state.token) return reply.redirect('/')
    reply.file('./public/random-hop.html')
  }
}
