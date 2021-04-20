import React, { Component } from 'react'
import {
    Layout
} from 'antd'
import {
    Route
} from 'react-router-dom'
import { routes } from '../../constants/routes'
import HeaderCustom from '../../components/header/headerCustom'
import './editor.css'
import Markdown from 'react-markdown'
import { OmitProps } from 'antd/lib/transfer/renderListBody'
const { Content, Footer } = Layout
class FSEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: "# Hello, *world*!"
        }
    }

    render() {
        const contentHeight = document.body.clientHeight - 64 - 62
        return (
            <Layout className="wrapper">
                <HeaderCustom key={"editor"} />
                <Layout className="wrapper-container">
                    <Layout className="wrapper-content">
                        <Markdown> ### A paragraph with *emphasis* and **strong importance**. </Markdown>
                    </Layout>
                    <Footer
                        style={{ textAlign: 'center' }}
                    >
                        Copyright © Water 2018
          </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default FSEditor