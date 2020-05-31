export default function({ store, redirect }) {
  const isTrainer = store.state.auth.user.role === 'Trainer'
  if (!isTrainer) {
    return redirect('/')
  }
}
