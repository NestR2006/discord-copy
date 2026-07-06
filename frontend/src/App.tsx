import './App.css'

import ChatsListSidebar from './components/sidebars/ChatsListSidebar'
import PrivateMessagesSidebar from './components/sidebars/PrivateMessagesSidebar'

function App() {

  return (
    <section id='main-body'>
      <ChatsListSidebar />
      <PrivateMessagesSidebar />
    </section>
  )
}

export default App
