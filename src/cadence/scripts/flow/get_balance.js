// This script returns the balance of an account's FLOW vault.
//
// Parameters:
// - address: The address of the account holding the FLOW vault.
export const getBalance = `
import FungibleToken from "../../contracts/FungibleToken"
import FlowToken from "../../contracts/FlowToken"

pub fun main(address: Address): UFix64 {
    let account = getAccount(address)

    let vaultRef = account.getCapability(/public/flowBalance)
        .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow reference to the vault balance")

    return vaultRef.balance
}
`