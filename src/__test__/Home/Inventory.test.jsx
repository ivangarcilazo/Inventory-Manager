/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen, waitFor} from '@testing-library/react'
import Inventory from '../../pages/Home/Components/Inventory'
import useFetch from '../../hooks/useFetch'
import { ContextAuth } from '../../Components/Context/ContextAuth'
import { useParams } from 'react-router-dom'


jest.mock('@react-pdf/renderer',()=>({
    Document:()=><></>,
    Page:()=><></>,
    Text:()=><></>,
    StyleSheet:{
        create:jest.fn
    },
    PDFViewer:()=><></>,
    PDFDownloadLink:()=><></>,
    View:()=><></>
}
))
jest.mock('react-router-dom')

jest.mock('../../hooks/useFetch')
const mockState = {
    token:'',
    statusAdmin:true
}

describe('Correct funcionality of component Inventory',()=>{

    test('Can add new product at inventory', async()=>{

        useParams.mockReturnValue({ nit: '123' });
        useFetch.mockReturnValue({
            data:{
                name:'Test company',
                inventory:[]
            },
            fetchData:jest.fn()
        })

        const {container} = render(
            <ContextAuth.Provider value={mockState}>
                <Inventory stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        
        //Arrange
        const buttonAddNewProduct = screen.getByTestId("buttonAddProduct")

        //Act
        fireEvent.click(buttonAddNewProduct)

        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Add new product of Test company')
            expect(titleModal).toBeInTheDocument()
        })

    })

    test('Can delete a product at inventory', async()=>{

        useParams.mockReturnValue({ nit: '123' });
        useFetch.mockReturnValue({
            data:{
                name:'Test company',
                inventory:[
                    {
                        productPrice:123,
                        productQuantity:12,
                        productName:'Test product',
                        productImage:'NO_IMAGE',
                        productDescription:'None'
                    }
                ]
            },
            fetchData:jest.fn()
        })

        const {container} = render(
            <ContextAuth.Provider value={mockState}>
                <Inventory stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        
        //Arrange
        const buttonDeleteProduct = screen.getByTestId("buttonDeleteProduct")

        //Act
        fireEvent.click(buttonDeleteProduct)

        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Are you sure delete ?')
            expect(titleModal).toBeInTheDocument()
        })

    })
    test('Can edit a product at inventory', async()=>{

        useParams.mockReturnValue({ nit: '123' });
        useFetch.mockReturnValue({
            data:{
                name:'Test company',
                inventory:[
                    {
                        productPrice:123,
                        productQuantity:12,
                        productName:'Test product',
                        productImage:'NO_IMAGE',
                        productDescription:'None'
                    }
                ]
            },
            fetchData:jest.fn()
        })

        const {container} = render(
            <ContextAuth.Provider value={mockState}>
                <Inventory stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        
        //Arrange
        const buttonEditProduct = screen.getByTestId("buttonEditProduct")

        //Act
        fireEvent.click(buttonEditProduct)

        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Modify item Test product')
            expect(titleModal).toBeInTheDocument()
        })

    })
})