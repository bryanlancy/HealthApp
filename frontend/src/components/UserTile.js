import React from 'react'

export default function UserTile({ user, button }) {


    const { username, avatar } = user
    return (
        <div className="user-tile">
            <div className="user-tile__avatar">
                <img src={`/images/avatars/${avatar}`} alt="avatar" />
            </div>
            <h2 className="user-tile__username">{username}</h2>

            {button && <div class="user-tile__button" onClick={button.handler}>
                <p>{button.text}</p></div>}

        </div>
    )
}
