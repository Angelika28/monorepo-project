import {createBrowserRouter} from "react-router-dom"
import {App} from "@/components/App"
import {Suspense} from "react"
import {Shop} from "@/pages/shop"
import {UserCard} from "@packages/shared/src/components/UserCard"


const routes = [
    {
        path: "/shop",
        element: <App/>,
        children: [
            {
                path: "/shop/main",
                element: <Suspense fallback={"Loading..."}><Shop/></Suspense>
            },
            {
                path: "/shop/second",
                element: <Suspense fallback={"Loading..."}>
                    <div style={{color: "red"}}>
                       <h2>Вторая страница в shop модуле</h2>
                        <UserCard username={"Angelika from shop"}/>
                    </div>

                </Suspense>
            },
        ]
    }
]
export const router = createBrowserRouter(routes)

export default routes
