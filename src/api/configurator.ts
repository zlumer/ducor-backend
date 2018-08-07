import { IConfigGenerateFunction, IConfigFunction } from "."
import { hashDataId } from "../utils/hasher"
import { getDataDefByHash } from "../reverse_map"
import { IContractEndpointSettings } from "../IOracleData"
import { types } from "../providers"

import { contract as fakeContract } from "../blockchains/fake"
import { contract as eosContract } from "../blockchains/eos"

import { matcher as binanceMatcher } from "../providers/crypto"

export let generators = {
	fake: fakeContract,
	eos: eosContract,
}

export let generate: IConfigGenerateFunction = ({ blockchain, category, slug, lifetime, provider, updatefreq }) => {
	let type = types[provider as keyof typeof types](slug)
	let name = slug.replace(/\W/gi, '').toLowerCase()
	let hash = hashDataId({ category, provider, ident: slug })
	if (!getDataDefByHash(hash))
		return {
			contract: "ERROR",
			instructions: `ERROR! hash "${hash}" not found!\n${blockchain}|${category}|${slug}|${provider}|${updatefreq}`
		}
	let e: IContractEndpointSettings = { name, type, lifetime: parseInt(lifetime), updateFreq: parseInt(updatefreq), hash }
	let generator = generators[blockchain as keyof typeof generators]
	if (!generator)
		return { contract: "...", instructions: "..." }

	return {
		contract: generator([e]),
		instructions: `${blockchain}_contract_instructions`
	}
}

let binancePairs = binanceMatcher('binance').listPairsExchange() // async!

export let config: IConfigFunction = () => ({
	categories: [
		{
			name: "crypto",
			types: [...binancePairs],
			providers: [
				{ id: "binance", name: "Binance", types: binancePairs },
				{ id: "bitfinex", name: "Bitfinex", types: binancePairs },
			]
		},
		{
			name: "stocks"
		},
		{
			name: "sports"
		},
		{
			name: "random"
		}
	],
})