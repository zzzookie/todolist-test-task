'use client'

import styles from './page.module.css'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pt_sans } from './layout'
import { selectTodosActive, selectTodosAll, selectTodosCompleted, todoActions } from './redux/todos'
import { RootState, TodoPoint } from './types'

export default function Home() {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [selectedTab, setSelectedTab] = useState('All');
  const dispatch = useDispatch();
  
  const todoList: TodoPoint[] = useSelector((state: RootState) => selectTodosAll(state));
  const todoListActive: TodoPoint[] = useSelector((state: RootState) => selectTodosActive(state));
  const todoListCompleted: TodoPoint[] = useSelector((state: RootState) => selectTodosCompleted(state));
  const newTodoInput = useRef<HTMLInputElement | null>(null);

  const formatter = new Intl.PluralRules("en-US")

  let showList: TodoPoint[] = [];

  switch (selectedTab) {
    case 'Active':
      showList = todoListActive;
      break;
    case 'Completed':
      showList = todoListCompleted;
      break;
    default:
      showList = todoList;
      break;
  }

  function handleSubmit(e: React.MouseEvent<HTMLSpanElement>): void {
    e.preventDefault();
    const value = newTodoInput.current?.value
    if (value && value.replaceAll(' ', '')) {
      dispatch(todoActions.add(value))
      newTodoInput.current!.value = ""
    }
    if (selectedTab === 'Completed') {
      setSelectedTab('All')
    }
  }

  function handleClear(): void {
    dispatch(todoActions.clearCompleted());
    setSelectedTab('All');
  }

  return (
    <main className={styles.main}>
      <h1>todos</h1>
      <section className={styles.list}>
        <form>
          <input type="text" ref={newTodoInput} placeholder='What needs to be done?'></input>
          <button onClick={e => handleSubmit(e)} role="submit" className='hidden'>Add</button>
        </form>

        <ul>
          {showList.map((td) => (
            <li key={td.id} className={styles.listpoint}>
              <div className={styles.listpointDescription}>
                <input onChange={() => dispatch(todoActions.check(td.id))} type="checkbox" id={`${td.id}`} checked={td.checked}></input>
                <label htmlFor={`${td.id}`}>{td.description}</label>
              </div>
              {td.checked && <button type="button" onClick={() => dispatch(todoActions.delete(td.id))} className={styles.deleteButton}>×</button>}
            </li>
          ))}
        </ul>

        <div className={`${styles.footer} ${pt_sans.className}`}>
          {windowWidth >= 420 && <div className={styles.itemsLeft}>
            {todoListActive.length} {formatter.select(todoListActive.length) === 'one' ? 'item' : 'items'} left
            </div>
          }
          <ul className={styles.tabSelector}>
            <li onClick={() => setSelectedTab('All')} className={selectedTab === 'All' ? styles.activeTab : ''}>
              All
            </li>
            <li onClick={() => setSelectedTab('Active')} className={selectedTab === 'Active' ? styles.activeTab : ''}>
              Active
            </li>
            <li onClick={() => setSelectedTab('Completed')} className={selectedTab === 'Completed' ? styles.activeTab : ''}>
              Completed
            </li>
          </ul>
          <div className={styles.clearCompleted}>
            <span onClick={() => handleClear()} className={todoListCompleted.length === 0 ? 'visuallyHidden' : undefined}>
            {windowWidth >= 420
                ? "Clear completed"
                : "Clear"
            }
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
