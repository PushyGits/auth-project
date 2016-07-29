module.exports = {
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    if (request.state.token) return reply.redirect('/random-hop')
    reply.view('go-photos')
  }
}
