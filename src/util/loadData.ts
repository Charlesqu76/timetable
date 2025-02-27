const dataList = [1, 2, 3, 4, 5, 6, 7, 8];

export async function loadJsonData<T>(filename: string): Promise<T> {
  try {
    const path = `/data/${filename}`;
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(
        `Failed to load data from ${filename}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    throw error;
  }
}

export async function loadDataList() {
  return Promise.all(dataList.map((id) => loadJsonData(`${id}.json`)));
}
