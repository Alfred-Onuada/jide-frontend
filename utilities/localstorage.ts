import AsyncStorage from "@react-native-async-storage/async-storage";

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    AsyncStorage.setItem(key, value as string);
    console.log("Data successfully saved");
  } catch (e) {
    console.log("Failed to save the data to the storage");
  }
}

export function getFromLocalStorage<T>(key: string): T {
  try {
    const value = AsyncStorage.getItem(key);
    if (value !== null) {
      console.log("Data retrieved successfully", value);
      return value as T;
    }
    return {} as T;
  } catch (e) {
    console.log("Failed to fetch the data from storage");
    return {} as T;
  }
}
