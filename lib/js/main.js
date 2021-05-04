function layerCardGenerator(
  layerTitle,
  layerName,
  defaultCheck,
  thumbnailUrl,
  description
) {
  var layerCard = `
    <div class="card-body layer-card">
            <div class="row">
              <div class="col-4 thumbnails">
                <img src=${thumbnailUrl} alt=${layerTitle} class="img-fluid" />
              </div>
              <div class="col-8">
                <div style="display: flex; justify-content: space-between">
                  <span class="d-block mt-2 layer-title">${layerTitle}</span>
                  <div class="custom-control custom-switch">
                    <input
                      type="checkbox"
                      class="custom-control-input layer-card-cb"
                      id=${layerName}
                      name=${layerTitle}
                      ${defaultCheck}
                    />
                    <label
                      class="custom-control-label"
                      for=${layerName}
                    ></label>
                  </div>
                </div>

                <div class="description">
                  ${description}
                </div>
              </div>
            </div>

            <div style="display: flex">
              <label for="opacity">
                <b class="mr-5 mt-2">Opacity:</b>
              </label>
              <input
                type="range"
                class="form-control-range opacity"
                value="100"
                min="0"
                max="100"
                code=${layerName}
                data-toggle="tooltip"
                title="Opacity"
              />
            </div>
          </div>
    `;

  return layerCard;
}
