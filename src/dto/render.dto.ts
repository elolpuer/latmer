import { AllCompaniesDto } from "./all.companies.dto";

export interface RenderPageDto {
    title: string,
    user?: {id: string, isCompany: boolean},
    allCompanies?: AllCompaniesDto[]
}