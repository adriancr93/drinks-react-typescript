import { useMemo } from "react"
import { NavLink, useLocation } from "react-router-dom"

export default function Header() {

  const {pathname} = useLocation()

  const isHome = useMemo(() => pathname === "/", [pathname])


  return (
    <header className={ isHome ? 'bg-header' : 'bg-slate-800'}>
        <div className="mx-auto container px-5 py-16">
            <div className="flex justify-between items-center">
                <div>
                    <img src="/logo.svg" alt="Logotipo" className="w-32" />
                </div>
                <nav className="flex gap-4">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>Home</NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? "text-orange-500 uppercase font-bold" : "text-white uppercase font-bold"}>Favorites</NavLink>
                </nav>
            </div>
            { isHome && (
                <form action="" className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg">
                    <div className="space-y-4">
                        <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Name or Ingredient</label>
                        <input type="text" id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none bg-white" placeholder="Name or Ingredient. Ex. Vodka, Tequila, Coffee"/>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categorie</label>
                        <select id="category" name="category" className="p-3 w-full rounded-lg focus:outline-none bg-white">
                            <option value="">-- Select --</option>
                        </select>   
                    </div>
                    <input type="submit" value="Search Recipe" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase my-4"/>
                </form>
            )}
        </div>
    </header>
  )
}
