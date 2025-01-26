import { generateMockServicesData } from "../../../../lib/mock-utils"
import { screen, render } from "@testing-library/react"
import { ServicesStatus } from "./ServicesStatus";
import { getComponentsInRouter } from "../../../../lib/test-utils";

jest.mock('react-chartjs-2', () => ({
  Chart: () => null
}));

describe("Services Status", ()=>{

    const services = generateMockServicesData(3);

    
    it("should show requested services data",()=>{
        render(getComponentsInRouter(<ServicesStatus services={services}/>))
        services.forEach((service)=>{
            expect(screen.getByText(service.title)).toBeInTheDocument()
            expect(screen.getAllByText(`status: ${service.isActive?"aktywny":"nieaktywny"}`)).toBeTruthy()
            expect(screen.getAllByText(`uptime: ${service.uptime}%`)).toBeTruthy()
        })
    })


})