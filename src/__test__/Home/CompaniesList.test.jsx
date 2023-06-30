/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, fireEvent, render, prettyDOM, waitFor } from '@testing-library/react'
import CompaniesList from '../../pages/Home/Components/CompaniesList'
import { ContextAuth } from '../../Components/Context/ContextAuth'
import useFetch from '../../hooks/useFetch'

jest.mock('react-router-dom',()=>({
    useNavigate:jest.fn(),
    Link:jest.fn()
}))
jest.mock('../../hooks/useFetch')
const mockState = {
    token:'',
    statusAdmin:true
}

describe('Correct funcionality of component Companies list.', ()=>{
    test('Can add new companie to list.', async()=>{
        //Arrange
        useFetch.mockImplementation(()=>{
            return{
                data:'',
                loading:false,
                fetchData:jest.fn(),
                error:false
            }
        })
        render(
            <ContextAuth.Provider value={mockState}>
                <CompaniesList stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        const buttonAdd = screen.getByTestId('buttonAddNewCompany')
        //Act
        fireEvent.click(buttonAdd)
        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Add new company')
            expect(titleModal).toBeInTheDocument()
        })
    })

    test('Can edit a existing company', async()=>{
        //Arrange
        useFetch.mockImplementation(()=>{
            return{
                data:[{
                    name:'Test company',
                    address:'Test address',
                    NIT:"123123",
                    phoneNumber:'+123123123'
                }],
                loading:false,
                fetchData:jest.fn(),
                error:false
            }
        })
        const {container} = render(
            <ContextAuth.Provider value={mockState}>
                <CompaniesList stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        const buttonEditCompany = screen.getByTestId('buttonEditExistingCompany')

        //Act
        fireEvent.click(buttonEditCompany)

        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Edit company of Test company')
            expect(titleModal).toBeInTheDocument()
        })
        
    })

    test('Can delete a existing company', async()=>{
        //Arrange
        useFetch.mockImplementation(()=>{
            return{
                data:[{
                    name:'Test company',
                    address:'Test address',
                    NIT:"123123",
                    phoneNumber:'+123123123'
                }],
                loading:false,
                fetchData:jest.fn(),
                error:false
            }
        })
        render(
            <ContextAuth.Provider value={mockState}>
                <CompaniesList stateAuth={mockState} />
            </ContextAuth.Provider>
        )
        const buttonEditCompany = screen.getByTestId('deleteButtonCompany')

        //Act
        fireEvent.click(buttonEditCompany)

        //Assert
        await waitFor(()=>{
            const titleModal = screen.getByText('Are you sure delete Test company ?')
            expect(titleModal).toBeInTheDocument()
        })
        
    })
    
})
