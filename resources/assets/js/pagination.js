/**
 * @copyright Copyright © 2025 BeastBytes - All rights reserved
 * @license BSD 3-Clause
 *
 * Supports Yii DataView widget pagination using the
 * [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API to update the DataView widget
 *
 * Example View code:
 * ```php
$assetManager->register(PaginationAsset::class);
$this->addJsFiles($assetManager->getJsFiles());
$this->addJsStrings(['pagination.init("grid-view-id"']);

echo GridView::widget()
  ->containerAttributes([
    'id' => 'grid-view-id',
    'data-_csrf' => $csrf,
    // other container attributes
    // all `data-` attributes are sent in the body of the request
 ])
 // GridView configuration
 ```
 */

const pagination = {
    options: {
        paginationLinkSelector: '.grid-view nav a, .list-view nav a'
    },
    init: function(id, options) {
        pagination.options = {...pagination.options, ...options || {}}
        pagination.attachEvents(id)
    },
    attachEvents: function(id) {
       const container = document.getElementById(id)

        for (const link of container.querySelectorAll(pagination.options.paginationLinkSelector)) {
            link.addEventListener(
                "click",
                (e) => {
                    e.preventDefault()
                    pagination.paginate(e.target, id)
                        .then(r => pagination.attachEvents(id))
                }
            )
        }
    },
    paginate: async function (target, id) {
        const container = document.getElementById(id)
        const dataset = container.dataset
        const formData = new FormData()

        formData.set("id", id)

        for (const property in dataset) {
            formData.set(property, dataset[property])
        }

        const request = new Request(target.href, {
            method: "POST",
            body: formData
        })
        const response = await fetch(request)
        container.outerHTML = await response.text()
    }
}
