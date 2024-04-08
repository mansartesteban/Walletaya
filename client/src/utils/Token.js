import tokens from "@/datas/tokens"

export const getToken = (value) => tokens.find(token => token.value === value)