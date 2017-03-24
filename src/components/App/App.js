/* eslint react/prop-types: 0 */

import React from 'react';
import {createConnector} from 'react-instantsearch';
import {
  InstantSearch,
  HierarchicalMenu,
  RefinementList,
  SortBy,
  Stats,
  ClearAll,
  StarRating,
  RangeInput,
  Highlight,
  Panel,
  Configure,
} from 'react-instantsearch/dom';
import {
  connectSearchBox,
  connectRefinementList,
  connectInfiniteHits,
} from 'react-instantsearch/connectors';
import 'react-instantsearch-theme-algolia/style.scss';

export default function App() {
  return (
    <InstantSearch
      appId="latency"
      apiKey="6be0576ff61c053d5f9a3225e2a90f76"
      indexName="ikea"
    >
      <Configure hitsPerPage={16} />
      <Header />
      <div className="wrapper">
        <Facets />
        <CustomResults />
      </div>
    </InstantSearch>
  );
}

const Header = () =>
  <header className="Header">
    <a
      href="https://community.algolia.com/instantsearch.js/react"
      className="Header-algoliaLink">
      <img
        className="Header-algoliaLogo"
        src="https://res.cloudinary.com/hilnmyskv/image/upload/w_100,h_100,dpr_2.0//v1461180087/logo-instantsearchjs-avatar.png"
        alt="logo"
        width={40}
      />
    </a>
    <a href="./" className="Header-logo">aeki</a>
    <ConnectedSearchBox/>
  </header>;

const Facets = () =>
    <aside className="Facets">

      <ClearAll
        translations={{
          reset: 'Clear all filters',
        }}
      />

      <section className="Facets-wrapper">
        <h4 className="Facets-categoryTitle">Show results for</h4>
          <HierarchicalMenu
            key="categories"
            attributes={[
              'category',
              'sub_category',
              'sub_sub_category',
            ]}
          />
      </section>

      <section className="Facets-wrapper">
        <h4 className="Facets-categoryTitle">Refine by</h4>
          <Panel title="Type">
            <RefinementList attributeName="type" operator="or" limitMin={5} withSearchBox/>
          </Panel>
          <Panel
            title="Materials">
            <RefinementList attributeName="materials" operator="or" limitMin={5} withSearchBox/>
          </Panel>
          <ConnectedColorRefinementList attributeName="colors" operator="or"/>
          <Panel title="Rating">
          <StarRating attributeName="rating" max={5}/>
          </Panel>
          <Panel title="Price">
            <RangeInput key="price_input" attributeName="price" />
          </Panel>
      </section>
      <div className="Facets-thanks">Data courtesy of <a href="http://www.ikea.com/">ikea.com</a></div>
    </aside>;

const CustomSearchBox = ({currentRefinement, refine}) =>
    <div className="CustomSearchBox">
      <input type="text"
             value={currentRefinement}
             onChange={e => refine(e.target.value)}
             autoComplete="off"
             className="CustomSearchBox-input"
             id="q"/>
      <button className="CustomSearchBox-btn">
        <svg
          className="CustomSearchBox-btnIcon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/>
        </svg>
      </button>
    </div>;

const ColorItem = ({item, createURL, refine}) => {
  const active = item.isRefined ? 'is-checked' : '';
  return (
    <a
      className={`${active} Facets-color`}
      href={createURL(item.value)}
      onClick={e => {
        e.preventDefault();
        refine(item.value);
      }}
      data-facet-value={item.label}
    >
      <svg
        className="Facets-colorCheck"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        <path d="M0 11.522l1.578-1.626 7.734 4.619 13.335-12.526 1.353 1.354-14 18.646z"/>
      </svg>
    </a>
  );
};

const CustomColorRefinementList = ({items, refine, createURL}) =>
    items.length > 0 ? <div>
      <h5 className={'ais-Panel__Title'}>Colors</h5>
      {items.map(item =>
        <ColorItem
          key={item.label}
          item={item}
          refine={refine}
          createURL={createURL}
        />
      )}
    </div> : null;

function CustomHits({hits, refine, hasMore}) {
  const loadMoreButton = hasMore ?
    <button onClick={refine} className="CustomHits-loadMore">Load more</button> :
    <button disabled className="CustomHits-loadMore">Load more</button>;
  return (
    <main className="CustomHits">
      {hits.map((hit, idx) =>
        <Hit item={hit} key={idx}/>
      )}
      {loadMoreButton}
    </main>
  );
}

const Hit = ({item}) => {
  const icons = [];
  for (let i = 0; i < 5; i++) {
    const suffix = i >= item.rating ? 'Hit-star--empty' : '';
    icons.push(<svg key={i} className={`Hit-star ${suffix}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>);
  }
  return (
    <article className="Hit">
      <div className="Hit-imgContainer">
        <img
          className="Hit-img"
          src={`${item.image}`}
          alt={`${item.name} - ${item.type}`}
        />
      </div>
      <div className="Hit-name"><Highlight attributeName="name" hit={item} /></div>
      <div className="Hit-type"><Highlight attributeName="type" hit={item} /></div>
      <div className="Hit-extraInfo">
        <div className="Hit-stars">
          {icons}
        </div>
        <div className="Hit-price">
          ${item.price}
        </div>
      </div>
    </article>);
};

const CustomResults = createConnector({
  displayName: 'CustomResults',

  getProvidedProps(props, searchState, searchResults) {
    const noResults = searchResults.results ? searchResults.results.nbHits === 0 : false;
    return {query: searchState.query, noResults};
  },
})(({noResults, query}) => {
  if (noResults) {
    return (
      <div className="CustomResults">
        <div className="CustomResults-noResults">
          No results found matching <span className="query">{query}</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="CustomResults">
        <section className="CustomResults-topBar">
          <Stats />
          <div className="CustomResults-sort">
            <label className="CustomResults-sortLabel">Sort by</label>
            <SortBy
              items={[
                {value: 'ikea', label: 'Featured'},
                {value: 'ikea_price_asc', label: 'Price asc.'},
                {value: 'ikea_price_desc', label: 'Price desc.'},
              ]}
              defaultRefinement="ikea"
            />
          </div>
        </section>
        <ConnectedHits/>
      </div>
    );
  }
});

const ConnectedSearchBox = connectSearchBox(CustomSearchBox);
const ConnectedColorRefinementList = connectRefinementList(CustomColorRefinementList);
const ConnectedHits = connectInfiniteHits(CustomHits);
