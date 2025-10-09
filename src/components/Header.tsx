import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: '',
    category: ''
  })
  const {pathname} = useLocation()
  const isHome = useMemo(() => pathname === "/", [pathname])

  const fetchCategories = useAppStore((state) => state.fetchCategories)
  const categories = useAppStore((state) => state.categories)
  const searchRecipes = useAppStore((state) => state.searchRecipes)

  useEffect(() => {
    fetchCategories()
  }, [])

  const handledChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
        ...searchFilters,
        [e.target.name]: e.target.value
    })
  }

  const handledSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //To do: validate
    if(Object.values(searchFilters).includes('')) {

        return
    }
    // Consult the recipes
    searchRecipes(searchFilters)
  }

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
                <form action="" className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg" onSubmit={handledSubmit}>
                    <div className="space-y-4">
                        <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg">Name or Ingredient</label>
                        <input type="text" id="ingredient" name="ingredient" className="p-3 w-full rounded-lg focus:outline-none bg-white" placeholder="Name or Ingredient. Ex. Vodka, Tequila, Coffee" onChange={handledChange} value={searchFilters.ingredient}/>
                    </div>

                    <div className="space-y-4">
                        <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg">Categories</label>
                        <select id="category" name="category" className="p-3 w-full rounded-lg focus:outline-none bg-white" onChange={handledChange} value={searchFilters.category}>
                            <option value="">-- Select --</option>
                            {categories.drinks.map((category) => (
                                <option key={category.strCategory} value={category.strCategory}>{category.strCategory}</option>
                            ))}
                        </select>
                    </div>
                    <input type="submit" value="Search Recipe" className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase my-4"/>
                </form>
            )}
        </div>
    </header>
  )
}
