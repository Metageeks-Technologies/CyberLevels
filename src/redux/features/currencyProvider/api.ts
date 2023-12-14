import { AppDispatch } from "@/redux/store";
import {
  fetchCurrenciesError,
  fetchCurrenciesRequest,
  fetchCurrenciesSuccess,
} from "./slice";
import { AxiosError } from "axios";

interface Currency {
    name: string;
    symbol: string;
  }
  
  interface Country {
    currencies?: Currency[];
  }


export const getAllCurrencies = async (dispatch: AppDispatch) => {
    dispatch(fetchCurrenciesRequest());
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countries: Country[] = await response.json();

    const currencies = Array.from(
      new Set(
        countries
          .map((country) => country.currencies || [])
          .flat()
          .filter(Boolean)
      )
    );
    // console.log(currencies);
    const flattenedValues = Array.from(
      new Set(currencies.flatMap((currency) => Object.values(currency)))
    );
    // console.log(flattenedValues);
    const currencyNames = Array.from(
        new Set( flattenedValues
      .map((currency) => currency.name)
      .filter(Boolean)
        )
    );
    // console.log(currencyNames);
    // const currencyList = Array.from(
    //     new Set(
    //         flattenedValues.map((c)=>c.name)
    //     )
    // )

    dispatch(fetchCurrenciesSuccess(currencyNames));
  } catch (error) {
    const e = error as AxiosError;
    console.error("Error fetching currencies:", error);
    dispatch(fetchCurrenciesError(e.message));
  }
};
