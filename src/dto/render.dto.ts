import { AllCompaniesDto } from "./all.companies.dto";
import { OtherCompanyDto } from './other_company.dto';
import { MerchDto } from './merch.dto'

export interface RenderPageDto {
    title: string,
    user?: {id: string, isCompany: boolean},
    allCompanies?: AllCompaniesDto[],
    company?: OtherCompanyDto,
    merch_Title?: string,
    isProducts?: boolean,
    merch_Array?:MerchDto[]
}