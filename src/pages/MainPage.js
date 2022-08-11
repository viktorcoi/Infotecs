import React, { useState } from "react";
import styles from '../assets/css/MainPage.module.css'
import BlueBlock from "../components/Blocks/BlueBlock";
import Note from "../components/Blocks/Note";
import Button from "../components/Buttons/Button";
import SearchInput from "../components/Inputs/SearchInput";
import logo from "../assets/img/logo.png"
import close from "../assets/img/close.svg"
import InputWithError from "../components/Inputs/InputWithError";
import TextArea from "../components/Inputs/TextArea";
import Selector from "../components/Inputs/Selector/Selector";
import Popup from "../components/Popup/Popup";

const MainPage = () => {

    const [DB, setDB] = useState([ // испольльзовал переменную по типу БД
        {
            id: 0,
            name: 'Create app for Infotecs (TODO notes)',
            status: 'Complete',
            colorStatus: 'complete',
            description: 'I need create app, it is change my life'
        },
    ])

    const [data, setData] = useState(DB) // присвоил БД в переменную для работы поиска

    const listStatus = ["Waiting", "In procces", "Complete"] // массив для селектора со статусами

    const [id, setID] = useState(-1) // переменная для id
    const [name, setName] = useState('') // переменная для имени
    const [status, setStatus] = useState(listStatus[0]) // переменная для статуса
    const [colorStatus, setColorStatus] = useState('waiting') // переменная для цвета статуса
    const [description, setDescription] = useState('') // переменная для описания

    const [change, setChange] = useState(false) // переменная для открития/закрытия редактирования
    const [error, setError] = useState(false) // перемення для ошибок
    const [popup, setPopup] = useState(false) // переменная для открития попапа
    const [manageNote, setManageNote] = useState('') // переменная для попапа сохранения/удаления
    
    const clickNote = (v) => { // функция для передачи данных с бд в переменные
        setChange(true) // откритие редактора
        setError(false) // убираем ошибки
        setID(v.id) // присвоил id заметки в переменную
        setName(v.name) // присвоил имя заметки в переменную
        setStatus(v.status) // присвоил статус заметки в переменную
        setColorStatus(v.colorStatus) // присвоил цвет статуса заметки в переменную
        setDescription(v.description) // присвоил описание заметки в переменную
    }

    const resetData = (bool) => { // функция для сброса переменных
        setChange(bool) // открыть/закрыть редактор в зависимости от bool
        setError(false) // убираем ошибки
        setID(-1) // сброс переменной id
        setName('') // сброс переменной имя
        setStatus(listStatus[0]) // сброс переменной статус
        setColorStatus('waiting') // сброс переменной цвет статуса
        setDescription('') // сброс переменной описание
    }

    const sendNote = () => { // функция для открития попапа сохранения
        if (name.length < 1) { // проверка инпута на ошибки
            setError(true) // показать ошибки
        } else {
            chooseColor();
            setError(false) // скрыть ошибки
            setManageNote('save') // попап сохранения
            setPopup(true) // открыть попап
        }
    }

    const removeNote = () => { // функция удаления заметки
        if (id !== -1) { // проерка на откритые заметки
            setManageNote('remove') // попап удаления
            setPopup(true) // открыть попап
        } else {
            setChange(false) // закрыть редактор
        }
    }

    const deleteNote = () => { // функция удаления заметки
        setDB(DB.filter((v) => id !== v.id)) // удаляем данные заметки по id из BD
        setData(data.filter((v) => id !== v.id)) // удаляем данные заметки по id из отображаемой BD
        setPopup(false) // закрываем попап
        setChange(false) // закрываем редактор
    }

    const chooseColor = () => { // функция присваивания цвета по статусу
        let listColorStatus = ["waiting", "procces", "complete"] // массив цветов
        for (var i = 0; i < listStatus.length; i++) { // цикл до размерности массива статуса
            if (listStatus[i] === status) { // условие равности статуса из массива и сатуса заметки
                setColorStatus(listColorStatus[i]) // присвоил цвет статуса заметки в переменную
            }
        }
    }

    const saveNote = () => { // функция сохранения/изменения заметки
        let vars = [name, status, colorStatus, description] // массив с переменными заметки
        let column = ["name", "status", "colorStatus", "description"] // массив для изменения заметки
        if (id > -1) { // проверка на новую или выбранную заметку
            for (var i = 0; i < column.length; i++) { // цикл до размерности массива
                DB.find(v => v.id === id)[column[i]] = vars[i] // переписываем данные заметки по id
            }
        } else { // если заметка новая
            let newData = DB.slice(); // создаем новый массив с данными как в BD
            newData[DB.length] = { // записываем данные в новый созданный массив в последний созданный id 
                id: DB.length === 0 ? 0 : DB[DB.length - 1].id + 1, // присваиваем id 
                name: name, // присваиваем имя
                status: status, // присваиваем статус
                colorStatus: colorStatus, // присваиваем цвет статуса
                description: description // присваиваем описание
            }
            setDB(newData) // присваиваем новый массив в БД
            setData(newData) // присваиваем новый массив в отображаемую БД
        }
        setPopup(false) // закрываем попап
        setChange(false) // закрываем редактор
    }

    return ( // Возращаем верстку
        <>
            <header>
                <div className={`${styles.header} margin-auto d-flex items-center between`}>
                    <a href="./">
                        <img className="transition_0_3" alt='logo' src={logo}></img>
                    </a>
                    <Button onClick={() => resetData(true)} view="header">Add a gnote</Button>
                </div>
            </header>

            <Popup clickClose={() => setPopup(false)} className={popup ? 'open' : ''} 
                title={manageNote === 'save' ? 'Save a note' : 'Remove a note'} // меняем имя попапа в зависимости от сохранения/удаления заметки
                clickYes={manageNote === 'save' ? saveNote : deleteNote}> {/* меняем вызов функции в зависимости от сохранения/удаления заметки */}
            </Popup>

            <div className="container">
                <h1>My notes</h1>
                <section className="d-flex between pos-relative">
                    <BlueBlock side='left'>
                        <SearchInput datasearch={DB} callback={(datasearch) => {setData(datasearch)}}/> {/* callback возращает БД в дочерний компонент */}
                        <div className={`border-22px ${styles['list-notes']}`}>
                            {
                                data.map((v, i) => { // мапим все заметки в лист с заметками
                                    return (
                                        <Note key={i} onClick={() => clickNote(v, i)} 
                                            name={v.name}  // обрезка имени происходит в css, если текст больше 90% блока
                                            status={v.colorStatus}>
                                        </Note>
                                    );
                                })
                            }
                        </div>
                        <Button onClick={() => resetData(true)} view='white'>Add a note</Button>
                    </BlueBlock>
                    <BlueBlock side='right' className={change ? 'open' : ''}>
                        <div className={`d-flex between items-center`}>
                            <h2>Change a note <span>| {status}</span></h2>
                            <img className={`cursor-pointer transition_0_3 ${styles['close-change']}`} 
                                onClick={() => setChange(false)}alt="close" src={close}>
                            </img>
                        </div>
                        <form id='note' className={styles['info-note']}>
                            <div className={`${styles['for-info']} d-flex between`}>
                                <InputWithError value={name} errorshow={error ? 'show' : ''} placeholder='Name a note' errortext="Empty field"
                                    onKeyUp={() => name.length < 1 ? setError(true) : setError(false)}
                                    onChange={(e) => {setName(e.target.value)}}/>
                                <Selector onMouseDown={(e) => setStatus(e.target.value)} title={status} items={listStatus}/>
                            </div>
                            <TextArea onChange={(e) => {setDescription(e.target.value)}} value={description}/>
                        </form>
                        <div className={`between d-flex ${styles['for-buttons']}`}>
                            <Button onClick={removeNote} view='blue'>Remove a note</Button>
                            <Button onClick={sendNote} view='white'>Save a note</Button>
                        </div>
                    </BlueBlock>
                </section>
            </div>
        </>
    )
}

export default MainPage
