/**
 * Utility functions for loading JSON data from the data folder
 */

/**
 * Loads a JSON file from the data directory
 * @param filename - The name of the JSON file (without path)
 * @returns The parsed JSON data
 */
export async function loadJsonData<T>(filename: string): Promise<T> {
    try {
      const response = await fetch(`/data/${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load data from ${filename}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data as T;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      throw error;
    }
  }