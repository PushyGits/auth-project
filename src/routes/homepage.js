module.exports = {
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    if (request.state.token) {
      return reply.redirect('go-photos')
    }
    reply.view('homepage')
  }
}
