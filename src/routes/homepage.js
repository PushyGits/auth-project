module.exports = {
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    if (!request.state.token) {
      return reply.redirect('login')
    }
    reply.view('homepage')
  }
}
