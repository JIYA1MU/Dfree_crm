import styled from "styled-components"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = ({children} : any) => {
    
    return(
        <>
        <div>
            <div><Navbar /></div>
            <div><Sidebar /></div>
        </div>
        <Main>{children}</Main>
    </>
    )
}

const Main = styled.main`
margin: 7rem 7rem 3rem 18rem;
@media (max-width : 1200px){
    margin: 6rem 6rem 2rem 14rem;
}
@media (max-width : 900px){
    margin: 5rem 3rem 2rem 10rem;;
}
@media (max-width : 600px){
    margin: 5rem 3rem 2rem 8rem;;
}
@media (max-width : 480px){
    margin: 5rem 3rem 2rem 7rem;;
}
@media (max-width : 350px){
    margin: 4rem 3rem 2rem 5rem;;
}
`

export default Layout