export default function({ store, redirect }) {
  if (store.state.auth.loggedIn && !store.state.auth.user.has_profile) {
    return redirect('/profiles/set-profile/')
  }
}
