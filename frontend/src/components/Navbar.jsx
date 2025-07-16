import { Link } from "react-router"
import { PlusIcon } from 'lucide-react'

const Navbar = () => {
  return <header className='bg-base-300 border-b border-base-content/10'>

    <div className='mx-auto max-w-6xl p-4'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-emerald-800 font-["Pacifico",_cursive] tracking-normal drop-shadow-md'>
          IdeaVault
        </h1>
        <div className='flex items-center gap-4'>

          <Link to={"/create"} className='btn btn-primary'>
            <PlusIcon className='size-5' />
            <span> New Note </span>
          </Link>

        </div>
      </div>
    </div>
  </header>
}

export default Navbar
