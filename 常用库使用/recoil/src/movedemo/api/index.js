import { userId } from "../stores/userInfo";
import {getConfigData} from '../mockData'

export const configData = async userId => await getConfigData(userId)