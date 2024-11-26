import Link from 'next/link'
import React from 'react'

export default function Category() {
    const catalog = [
        { title: 'Гранаты', active: true, links: './icons/free-icon-grenade-1281087.svg' },
        { title: 'Дым', active: true, links: './icons/free-icon-grenade-2514237.svg' },
        // { title: 'Растяжки-мины', active: true, links: './icons/free-icon-grenade-13091752.svg' },
        // { title: 'Пульты', active: true, links: './icons/free-icon-remote-16276269.svg' },
        // { title: 'Обмундирования', active: false, links: './icons/free-icon-paintball-1099542.svg' },
        // { title: 'Пульки', active: false, links: './icons/free-icon-paintball-588794_1.svg' },
        // { title: 'Автоматы/Пистолеты', active: false, links: './icons/icons8-оружие-для-пейнтбола-50.svg' },
    ]
    return (
        <div className="category_items">
            {catalog.map((item, index) => (
                <Link className={item.active ? "category_item" : "category_item active"} href={`/category/${item.title}`} key={index}>
                    <div className="category_img_theme">
                        <p className="category_title">{item.title}</p></div>
                </Link>
            ))}
        </div>
    )
}
