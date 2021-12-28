import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Home from "@/pages/index"
import DepartureTable from "@/components/DepartureTable"

describe("Tests", () => {

   it("renders a heading", () => {
      render(<Home />)

      const heading = screen.getByRole("heading", {
         name: /Real-time Departures/i,
      })

      expect(heading).toBeInTheDocument();
   })

   it("renders a table", () => {
      render(<DepartureTable />)

      const table = screen.getByRole("table")

      expect(table).toBeInTheDocument();
   })

})