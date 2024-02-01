import classes from "./App.module.scss"
import React from "react"
import {Outlet} from "react-router-dom"
import {deepMerge} from "@packages/shared/src/utils/deepMerge"
import {UserCard} from "@packages/shared/src/components/UserCard"; //импортируем, как будто из какой-то внешней библиотеки или npm-пакета

export const App = () => {
    deepMerge()
    return (
        <div>
            <h1>ADMIN MODULE</h1>
            <div>Ссылка на wiki</div>
            <Outlet/>
            <UserCard username={"Angelika from admin"}/>
        </div>
    )
}

