import React from 'react'

type Props = {
    username?: string
}

export function UserCard(props: Props) {
    const {username} = props
    return (
        <div style={{border: "1px solid purple", padding: "20px"}}>
            <div>username: {username ?? "user unknown"}</div>
            <div>password: 123456</div>
        </div>
    )
}
