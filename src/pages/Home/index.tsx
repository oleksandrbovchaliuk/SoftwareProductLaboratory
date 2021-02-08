import React from 'react'
import { useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { useHistory } from "react-router-dom";


import View from './view'

type Props = RouteComponentProps
 
const Home: React.FC<Props> = () =>{ 

    const history = useHistory();

    const isLoading = useSelector<ReduxState, boolean>(
        (state) => state.user.isLoading
      )

    const goToTasks = () => {
        history.push('/tasks')
    }

return <View isLoading={isLoading} goToTasks={goToTasks} />}

export default Home
