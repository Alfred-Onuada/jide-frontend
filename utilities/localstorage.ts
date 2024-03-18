import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveToLocalStorage<T>(
  key: string,
  value: T
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log("Data successfully saved");
  } catch (e) {
    console.log("Failed to save the data to the storage");
  }
}

export async function getFromLocalStorage<T>(key: string): Promise<T | null> {
  try {
    const value = (await AsyncStorage.getItem(key)) as T;
    if (value !== null) {
      console.log("Data retrieved successfully", value);
    }
    return value;
  } catch (e) {
    console.log("Failed to fetch the data from storage");
    return null;
  }
}
