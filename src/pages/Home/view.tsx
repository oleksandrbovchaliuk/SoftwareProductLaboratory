import Layout from '@common/Layout'
import { Button, Grid } from '@material-ui/core'
import React from 'react'

interface Props {
    isLoading?: boolean
    goToTasks?: ()=>void
}

const View: React.FC<Props> = ({ isLoading, goToTasks }) => (
    <Layout showLoader={isLoading}>
        <Grid container direction="column" xs={10}>
            <div style={{fontSize: 40, fontFamily: "Roboto", textAlign: "center", marginTop: 20}}>Оберіть модуль</div>
            <Button variant="contained" style={{ margin: 10, marginTop: 50, height: 70 }}>Модуль кодування</Button>
            <Button variant="contained" style={{ margin: 10, height: 70 }}>Модуль тестування</Button>
            <Button variant="contained" style={{ margin: 10, height: 70 }} onClick={goToTasks}>Модуль проектування</Button>
            <Button variant="contained" style={{ margin: 10, height: 70 }}>Модуль визначення вимог</Button>
        </Grid>
    </Layout>)

export default View