import axios from 'axios'
import React, { useState, useEffect } from 'react'

export const Todo = () => {
    const [todos, setTodos] = useState([])
    const [text, setText] = useState("")
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(2)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        // const gettodo = async () => {
        // let r = await axios.get("http://localhost:8080/todos")

        //   console.log(r)
        //  setTodos(r.data)
        axios.get(`http://localhost:8080/todos?_page=${page}&_limit=${limit}`).then((r) => {
            setTodos(r.data)
            setTotal(Number(r.headers["x-total-count"]))
            console.log(r)
        })
        //  }
        // gettodo()
    }, [page, limit])
    return (
        <div>

            <select onChange={(e) => {
                setLimit(e.target.value)
            }} name="" id="">
                <option value={2}>2</option>
                <option value={3}>3</option>

            </select>
            <input onChange={(e) => setText(e.target.value)} type="text" placeholder="Enter todo" />
            <button onClick={() => {
                const payload = {
                    name: text,
                    status: false,
                };
                fetch("http://localhost:8080/todos", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(payload)
                })

            }}>Add todo</button>
            {todos.map((t) => <h1 key={t.id}>{t.name}</h1>)}

            <button disabled={page <= 1} onClick={() => {
                if (page > 1) {
                    setPage(page - 1)
                }
            }}>Prev</button>
            <button disabled={total <= page * 2} onClick={() => {
                setPage(page + 1)
            }}>Next</button>
        </div>
    )
}
