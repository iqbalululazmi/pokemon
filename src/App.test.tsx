import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import Pokemon from "./pages/Pokemon/Pokemon";
import Pokedex from "./pages/Pokedex/Pokedex";

const mocks: any[] = []; // We'll fill this in next

it("renders pokemon component", () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Pokemon />
        </MockedProvider>
    );

    const tree: any = component.toJSON();
    expect(tree.children[0].children[0].type).toContain("svg");
});

it("renders pokedex component", () => {
    const component = TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Pokedex />
        </MockedProvider>
    );

    const tree: any = component.toJSON();
    expect(tree.children[0].children[0].type).toContain("img");
});
