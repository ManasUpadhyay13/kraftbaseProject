import KanbanBoard from '../components/KanbanBoard'
import Navbar from '../components/Navbar'
import Toolbar from '../components/Toolbar'
import '../styles/kanban.css'

const Kanban = () => {


  return (
    <div className='kanban'>
      <Navbar />
      <Toolbar />
      <KanbanBoard />
    </div>
  )
}

export default Kanban
