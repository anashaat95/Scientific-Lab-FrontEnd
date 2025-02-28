import { getAllCitiesOptionsService } from "@/app/(PagesInDashboard)/cities/citiesServicesBackEnd";
import { getAllCompaniesOptionsService } from "@/app/(PagesInDashboard)/companies/companiesServicesBackEnd";
import { getAllCountriesOptionsService } from "@/app/(PagesInDashboard)/countries/countriesServicesBackEnd";
import { getAllDepartmentsOptionsService } from "@/app/(PagesInDashboard)/departments/departmentsServicesBackEnd";
import { getAllEquipmentsOptionsService } from "@/app/(PagesInDashboard)/equipments/equipmentsServicesBackEnd";
import { getAllLabsOptionsService } from "@/app/(PagesInDashboard)/labs/labsServicesBackEnd";
import {
  getAllResearchersOptionsService,
  getAllTechniciansOptionsService,
  getAllUsersOptionsService,
} from "@/app/(PagesInDashboard)/users/usersServicesBackEnd";
import { getErrorMessageWithStatusCode } from "@/app/api/helpers";
import { IEntitySelectOption, IFetcherData, IItemInSelect } from "@/interfaces";
import "server-only";

export const fetcherFn = async (serviceFn: () => Promise<any>): Promise<IFetcherData> => {
  const data: IFetcherData = { data: null, isSuccess: false, errorMessage: null, isError: false, isNetworkError: false };
  try {
    data.data = await serviceFn();
    data.isSuccess = true;
    return data;
  } catch (error: any) {
    let { errorMessage }: { errorMessage: string } = await getErrorMessageWithStatusCode(error);
    data.errorMessage = errorMessage;
    data.isError = true;

    if (data.errorMessage?.includes("Network error")) data.isNetworkError = true;
  }

  return data;
};

export const getCompaniesDepartmentsLabsSelectOptionsData = async () => {
  const data: { companies: IItemInSelect[]; departments: IItemInSelect[]; labs: IItemInSelect[] } = { companies: [], departments: [], labs: [] };

  const [companies, departments, labs] = await Promise.all([
    fetcherFn(getAllCompaniesOptionsService),
    fetcherFn(getAllDepartmentsOptionsService),
    fetcherFn(getAllLabsOptionsService),
  ]);

  companies.data?.data.forEach((company: IEntitySelectOption) => {
    data.companies.push({ value: company.id, label: company.name });
  });

  departments.data?.data.forEach((department: IEntitySelectOption) => {
    data.departments.push({ value: department.id, label: department.name });
  });

  labs.data?.data.forEach((lab: IEntitySelectOption) => {
    data.labs.push({ value: lab.id, label: lab.name });
  });

  return data;
};

export const getCitiesCountriesSelectOptionsData = async () => {
  const data: { cities: IItemInSelect[]; countries: IItemInSelect[] } = { cities: [], countries: [] };

  const [cities, countries] = await Promise.all([fetcherFn(getAllCitiesOptionsService), fetcherFn(getAllCountriesOptionsService)]);

  cities.data?.data.forEach((city: IEntitySelectOption) => {
    data.cities.push({ value: city.id, label: city.name });
  });

  countries.data?.data.forEach((country: IEntitySelectOption) => {
    data.countries.push({ value: country.id, label: country.name });
  });

  return data;
};

export const getCompaniesSelectOptionsData = async () => {
  const data: { companies: IItemInSelect[] } = { companies: [] };

  const [companies] = await Promise.all([fetcherFn(getAllCompaniesOptionsService)]);

  companies.data?.data.forEach((company: IEntitySelectOption) => {
    data.companies.push({ value: company.id, label: company.name });
  });

  return data;
};

export const getDepartmentsUsersSelectOptionsData = async () => {
  const data: { departments: IItemInSelect[]; users: IItemInSelect[] } = { departments: [], users: [] };

  const [departments, users] = await Promise.all([fetcherFn(getAllDepartmentsOptionsService), fetcherFn(getAllUsersOptionsService)]);

  departments.data?.data.forEach((department: IEntitySelectOption) => {
    data.departments.push({ value: department.id, label: department.name });
  });

  users.data?.data.forEach((user: IEntitySelectOption) => {
    data.users.push({ value: user.id, label: user.name });
  });

  return data;
};

export const getEquipmentsTechniciansSelectOptionsData = async () => {
  const data: { equipments: IItemInSelect[]; users: IItemInSelect[] } = { equipments: [], users: [] };

  const [equipments, users] = await Promise.all([fetcherFn(getAllEquipmentsOptionsService), fetcherFn(getAllTechniciansOptionsService)]);

  equipments.data?.data.forEach((equipment: IEntitySelectOption) => {
    data.equipments.push({ value: equipment.id, label: equipment.name });
  });

  users.data?.data.forEach((user: IEntitySelectOption) => {
    data.users.push({ value: user.id, label: user.name });
  });

  return data;
};

export const getEquipmentsResearchersSelectOptionsData = async () => {
  const data: { equipments: IItemInSelect[]; researchers: IItemInSelect[] } = { equipments: [], researchers: [] };

  const [equipments, researchers] = await Promise.all([fetcherFn(getAllEquipmentsOptionsService), fetcherFn(getAllResearchersOptionsService)]);

  equipments.data?.data.forEach((equipment: IEntitySelectOption) => {
    data.equipments.push({ value: equipment.id, label: equipment.name });
  });

  researchers.data?.data.forEach((user: IEntitySelectOption) => {
    data.researchers.push({ value: user.id, label: user.name });
  });

  return data;
};

export const getResearchersSelectOptionsData = async () => {
  const data: { researchers: IItemInSelect[] } = { researchers: [] };

  const [researchers] = await Promise.all([fetcherFn(getAllResearchersOptionsService)]);

  researchers.data?.data.forEach((user: IEntitySelectOption) => {
    data.researchers.push({ value: user.id, label: user.name });
  });

  return data;
};

export const getDepartmentsSelectOptionsData = async () => {
  const data: { departments: IItemInSelect[] } = { departments: [] };

  const [departments] = await Promise.all([fetcherFn(getAllDepartmentsOptionsService)]);

  departments.data?.data.forEach((department: IEntitySelectOption) => {
    data.departments.push({ value: department.id, label: department.name });
  });
  return data;
};

export const getUsersSelectOptionsData = async () => {
  const data: { users: IItemInSelect[] } = { users: [] };

  const [users] = await Promise.all([fetcherFn(getAllUsersOptionsService)]);

  users.data?.data.forEach((user: IEntitySelectOption) => {
    data.users.push({ value: user.id, label: user.name });
  });

  return data;
};
