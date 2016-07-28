module.exports = {
  path: '/go-photos',
  method: 'GET',
  handler: (request, reply) => {
    if (!request.state.token) {
      return reply.redirect('login')
    }
    reply.view('go-photos')
  }
}
