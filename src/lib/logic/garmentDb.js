export const garmentDb = {
	silhouettes: {
		'shirt': {
			id: 'shirt',
			name: 'Classic Shirt',
			svgPath: 'M300,250 L700,250 L700,850 L300,850 Z', // Straight cut
			features: {
				neckline: {
					name: 'Neckline',
					default: 'round',
					options: [
						{ id: 'round', name: 'Round', svgPath: 'M380,250 Q500,400 620,250' },
						{ id: 'v-neck', name: 'V-Neck', svgPath: 'M400,250 L500,400 L600,250' }
					]
				},
				collar: {
					name: 'Collar',
					default: 'shirt',
					options: [
						{ id: 'none', name: 'None', svgPath: '' },
						{ id: 'shirt', name: 'Button Up', svgPath: 'M380,250 Q500,320 620,250 L650,200 L500,280 L350,200 Z' },
						{ id: 'chinese', name: 'Chinese / Mandarin', svgPath: 'M380,250 Q500,320 620,250 L630,200 Q500,260 370,200 Z M430,240 Q500,220 570,240' }
					]
				},
				sleeves: {
					name: 'Sleeves',
					default: 'short',
					options: [
						{ id: 'none', name: 'Sleeveless', svgPathLeft: '', svgPathRight: '' },
						{ id: 'short', name: 'Short', svgPathLeft: 'M300,250 L220,220 L180,450 L340,480 Z', svgPathRight: 'M700,250 L780,220 L820,450 L660,480 Z' },
						{ id: 'full', name: 'Full Length', svgPathLeft: 'M300,250 L180,220 L100,750 L250,800 Z', svgPathRight: 'M700,250 L820,220 L900,750 L750,800 Z' }
					]
				},
				details: {
					name: 'Details',
					default: 'none',
					multiSelect: true,
					options: [
						{ id: 'none', name: 'None', svgPath: '' },
						{ id: 'pocket-left', name: 'Left Pocket', svgPath: 'M420,350 L500,350 L500,450 L420,450 Z' },
						{ id: 'buttons', name: 'Center Buttons', type: 'circles', coords: [[500, 400], [500, 500], [500, 600], [500, 700]] }
					]
				}
			}
		},
		'churidar': {
			id: 'churidar',
			name: 'Churidar / Anarkali',
			svgPath: 'M420,170 C400,170 360,180 340,200 C320,230 310,350 320,450 C330,550 310,650 310,850 L620,850 C620,650 600,550 610,450 C620,350 610,230 590,200 C570,180 530,170 510,170 Z', 
			features: {
				neckline: {
					name: 'Neckline',
					default: 'slit',
					options: [
						{ id: 'round', name: 'Round', svgPath: 'M420,180 Q500,280 510,180' },
						{ id: 'slit', name: 'Neck Slit', svgPath: 'M485,165 Q500,185 515,165 L500,210 Z' }
					]
				},
				sleeves: {
					name: 'Sleeves',
					default: 'three-quarter',
					options: [
						{ id: 'none', name: 'Sleeveless', svgPathLeft: '', svgPathRight: '' },
						{ id: 'three-quarter', name: '3/4 Length (Pose)', 
						  svgPathLeft: 'M340,200 L280,220 C260,250 250,400 270,480 L330,450 Z', 
						  svgPathRight: 'M590,200 L680,230 C750,280 780,350 720,420 L610,450 L610,350 Z' }
					]
				},
				pants: {
					name: 'Pants',
					default: 'basic',
					options: [
						{ id: 'none', name: 'None', svgPath: '' },
						{ id: 'basic', name: 'Basic Churidar', svgPath: 'M380,850 L440,850 L460,980 L390,980 Z M540,850 L600,850 L620,980 L550,980 Z' }
					]
				},
				dupatta: {
					name: 'Dupatta',
					default: 'side-drape',
					options: [
						{ id: 'none', name: 'None', svgPath: '' },
						{ id: 'side-drape', name: 'Side Drape', svgPath: 'M620,420 C750,550 950,750 980,980 L550,980 C600,850 630,650 620,420 Z' }
					]
				}
			}
		}
	}
};

/**
 * Generates a default configuration object for a given silhouette.
 */
export function getDefaultConfig(silhouetteId) {
	const silhouette = garmentDb.silhouettes[silhouetteId];
	if (!silhouette) return null;

	const config = {
		silhouette: silhouetteId,
		fabric: { type: 'color', value: '#f0f0f0' },
		partFabrics: {
			body: { type: 'color', value: '#f0f0f0' }
		},
		features: {}
	};

	// Populate default features based on the DB
	for (const [featureKey, featureData] of Object.entries(silhouette.features)) {
		config.features[featureKey] = featureData.multiSelect ? [] : featureData.default;
		
		// Initialize part fabrics for features
		if (featureKey === 'sleeves') {
			config.partFabrics.sleeve_l = { type: 'color', value: '#f0f0f0' };
			config.partFabrics.sleeve_r = { type: 'color', value: '#f0f0f0' };
		} else if (featureKey === 'pants') {
			config.partFabrics.pants = { type: 'color', value: '#cccccc' };
		} else if (featureKey === 'dupatta') {
			config.partFabrics.dupatta = { type: 'color', value: '#e0e0e0' };
		} else if (featureKey !== 'details') {
			config.partFabrics[featureKey] = { type: 'color', value: '#ffffff' };
		}
	}
	
	// Ensure pocket fabric exists if details are supported
	if (silhouette.features.details) {
		config.partFabrics.pocket = { type: 'color', value: '#e0e0e0' };
	}

	return config;
}