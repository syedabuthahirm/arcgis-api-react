import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import React from 'react';
import MapPage from './App';
import { render, fireEvent } from './test-utils';

test('Render Map Page', () => {
  render(<MapPage />);

})