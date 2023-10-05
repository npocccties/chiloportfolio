import axios from "axios";
import { Consumer } from "./data";

export const getConsumers = async (): Promise<Consumer[]> => {
  console.log("### start getConsumers ###");
  try {
    //TODO：環境変数からURLを取得すると baseUrl の方の値になってしまうので一旦固定値を設定
    //const baseUrl = process.env.okutepBaseUrl
    const baseUrl = 'https://okutep.osaka-kyoiku.ac.jp'
    const apiPath = '/api/v1/consumer/list/';
    const result = await axios.get<Consumer[]>(`${baseUrl}${apiPath}`);
    
    console.log("### end getConsumers ### =", result);
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getConsumerFrameworkList = async (consumerId: String): Promise<any> => {
  console.log("### start getConsumerFrameworkList ###");
  try {
    const baseUrl = process.env.okutepBaseUrl
    const apiPath = '/api/v1/consumer/framework/list/';
    const result = await axios.get(`${baseUrl}${apiPath}?consumer_id=${consumerId}`);

    console.log("### end getConsumerFrameworkList ### =", result);
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
